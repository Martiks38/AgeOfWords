import { useCallback, useEffect, useState } from 'react'
import ModalResults from '../../components/Results'

import { useUserConnected } from '../../hooks/useUserConnected'
import { initialDataGame } from '../../const/variables'

import { DataGame } from '../../interfaces'

function GameBoard() {
  const [dataGame, setDataGame] = useState<DataGame>(() =>
    structuredClone(initialDataGame)
  )
  const { isConnected } = useUserConnected()
  const [view, setView] = useState<boolean>(false)

  const { answer, status, turn, words } = dataGame

  useEffect(() => {
    const controller = new AbortController()

    const getAnswer = async () => {
      try {
        const res = await fetch('http://localhost:3030/api/v1/word/rand', {
          signal: controller.signal,
        })
        const resData = await res.json()

        if (res.status < 200 || res.status > 299) throw resData

        setDataGame((prevDataGame) => {
          return { ...prevDataGame, answer: resData.word }
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (dataGame.answer === '') getAnswer()

    return () => controller.abort()
  }, [dataGame])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event
      const { answer, status, turn, words } = dataGame

      if (status === 'finished') return

      switch (key) {
        case 'Enter': {
          if (words[turn].some((letter) => letter === '')) return

          if (words[turn].join('') === answer || turn + 1 === 6) {
            setDataGame((prevDataGame) => {
              return { ...prevDataGame, status: 'finished' }
            })

            setTimeout(() => {
              setView((prevView) => !prevView)
            }, 2000)
          }

          setDataGame((prevDataGame) => {
            return { ...prevDataGame, turn: prevDataGame.turn + 1 }
          })

          return
        }

        case 'Backspace': {
          let firstEmptyIndex = words[turn].findIndex((letter) => letter === '')

          const cpyWords = words.slice()

          if (firstEmptyIndex === -1) firstEmptyIndex = cpyWords[turn].length

          cpyWords[turn][firstEmptyIndex - 1] = ''

          setDataGame((prevDataGame) => {
            return { ...prevDataGame, words: cpyWords }
          })

          return
        }

        default: {
          // Check if it is a letter
          if (!/^[a-z]$/i.test(key)) return

          const firstEmptyIndex = words[turn].findIndex(
            (letter) => letter === ''
          )

          // Check if there are any empty spaces yet
          if (firstEmptyIndex === -1) return

          const cpyWords = words.slice()

          cpyWords[turn][firstEmptyIndex] = key.toUpperCase()

          setDataGame((prevDataGame) => {
            return { ...prevDataGame, words: cpyWords }
          })

          return
        }
      }
    },
    [dataGame]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <main className="g-center">
      <article className="board">
        {status === 'finished' && (
          <div
            style={
              words[turn - 1].join('') === answer
                ? {
                    width: '100%',
                    justifyContent: 'right',
                  }
                : undefined
            }
            className="board__header"
          >
            {words[turn - 1].join('') !== answer && (
              <p className="board__answer">
                <span className="board__answer board__answer__text">
                  The word was {answer}
                </span>
              </p>
            )}
            <button
              className="buttton button_stadistics"
              onClick={() => setView((prevView) => !prevView)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </button>
          </div>
        )}
        {words.map((word, wordIndex) => (
          <section key={`R-${wordIndex}`} className="word">
            {word.map((letter, letterIndex) => {
              const isCorrect =
                letter && wordIndex < turn && letter === answer[letterIndex]

              const isPresent =
                letter &&
                wordIndex < turn &&
                letter !== answer[letterIndex] &&
                answer.includes(letter)

              return (
                <div
                  key={`L-${wordIndex}${letterIndex}`}
                  className={`letter ${
                    turn > wordIndex && `flip-${letterIndex}`
                  }`}
                >
                  <div className="letter__front">
                    <span>{letter}</span>
                  </div>
                  <div
                    className={`flip letter__back ${
                      isCorrect && 'letter__back_correct'
                    } ${isPresent && 'letter__back_present'}`}
                  >
                    <span>{letter}</span>
                  </div>
                </div>
              )
            })}
          </section>
        ))}
      </article>
      {isConnected.connected && view && (
        <ModalResults.ModalResultConnected
          win={words[turn - 1].join('') === answer}
          view={view}
          setView={setView}
          turn={turn}
          setDataGame={setDataGame}
        />
      )}
      {!isConnected.connected && view && (
        <ModalResults.ModalResultNotConnected
          view={view}
          setView={setView}
          message={words[turn - 1].join('') === answer ? 'Victory' : 'Defeat'}
          setDataGame={setDataGame}
        />
      )}
    </main>
  )
}

export default GameBoard
