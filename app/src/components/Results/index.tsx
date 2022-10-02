import { useCallback, useEffect, useRef } from 'react'
import Modal from '../Modal'

import { getDataUser } from '../../utils/getDataUser'
import { useUserConnected } from '../../hooks/useUserConnected'

import { SetState } from '../../types'
import { useCloseModal } from '../../hooks/useCloseModal'
import { DataGame } from '../../interfaces'
import { initialDataGame } from '../../const/variables'

function ModalResultConnected({
  win,
  view,
  setView,
  turn,
  setDataGame,
}: {
  win: boolean
  view: boolean
  setView: SetState<boolean>
  turn: number
  setDataGame: SetState<DataGame>
}) {
  const { isConnected, setIsConnected } = useUserConnected()

  const loadResult = useRef(0)

  useCloseModal(view, setView)

  const playAgain = useCallback(() => {
    setDataGame(() => {
      return structuredClone(initialDataGame)
    })
    setView((prevView) => !prevView)
  }, [])

  useEffect(() => {
    let abortGet = new AbortController()
    let abortPost = new AbortController()

    const getResults = async () => {
      try {
        let dataUser = getDataUser()

        if (!dataUser) throw { message: 'The token is not found' }

        let total = isConnected.results.total + 1

        const newValue = win
          ? {
              ...isConnected.results,
              [`try_${turn}`]: isConnected.results[`try_${turn}`] + 1,
              total,
            }
          : { ...isConnected.results, total }

        setIsConnected((prevIsConnected) => {
          return { ...prevIsConnected, results: newValue }
        })

        const optionsPost = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-access-token': dataUser.token,
          },
          body: JSON.stringify({ field: 'results', newValue: newValue }),
          AbortSignal: abortPost.signal,
        }

        const resPost = await window.fetch(
          'http://localhost:3030/api/v1/user/modify',
          optionsPost
        )

        const dataResPost = await resPost.json()

        if (resPost.status < 200 || resPost.status > 299) throw dataResPost
      } catch (error) {
        console.log(error)
      }
    }

    if (loadResult.current !== 1) {
      loadResult.current = 1
      getResults()
    }

    return () => {
      abortGet.abort()
      abortPost.abort()
    }
  }, [isConnected, loadResult, win])

  const tries = Object.entries(isConnected.results).slice(0, -1)

  const max = Math.max(...Object.values(isConnected.results).slice(0, -1))

  let successRate = 0

  Object.values(isConnected.results)
    .slice(0, -1)
    .forEach((value) => (successRate += value))

  return (
    <Modal>
      <header className="modal__header">
        <h3 className="modal__header__title">Stadistics</h3>
        <button className="modal__close">
          <div className="line"></div>
        </button>
      </header>
      <div className="modal__container">
        <div className="gameInformation">
          <div className="gameInformation__block">
            <span className="gameInformation__blockNumber">
              {isConnected.results.total}
            </span>
            <span>Total tries</span>
          </div>
          <div className="gameInformation__block">
            <span className="gameInformation__blockNumber">
              {Math.floor((successRate * 100) / isConnected.results.total) || 0}
              %
            </span>
            <span>Success rate</span>
          </div>
        </div>
        <h4 className="modal__container__title">Guess Distribution</h4>
        {tries.map((result, resultIndex) => {
          return (
            <div key={result[0]} className="resultBar">
              <div className="resultBar__try">{resultIndex + 1}</div>
              <div
                className={`resultBar__bar ${
                  turn - 1 === resultIndex && win && 'resultBar__bar_turn'
                }`}
                style={{ width: `${(result[1] * 100) / max}%` }}
              >
                {result[1]}
              </div>
            </div>
          )
        })}
        <button
          className="button button_playAgain button_playAgain_blue"
          onClick={() => playAgain()}
        >
          <span className="button_playAgain_letter">Play again</span>
        </button>
      </div>
    </Modal>
  )
}

function ModalResultNotConnected({
  view,
  setView,
  message,
  setDataGame,
}: {
  view: boolean
  setView: SetState<boolean>
  message: string
  setDataGame: SetState<DataGame>
}) {
  useCloseModal(view, setView)

  const playAgain = useCallback(() => {
    setDataGame(() => {
      return structuredClone(initialDataGame)
    })
    setView((prevView) => !prevView)
  }, [])

  return (
    <Modal styleModify={'modal_result'}>
      <button
        className="modal__close modal__close_right"
        onClick={() => setView((prevView) => !prevView)}
      >
        <div className="line line_result"></div>
      </button>
      <section className="modal__container text-center">
        <p className="modal_result_letter">{message}</p>
        <button
          className="button button_playAgain button_playAgain_blue"
          onClick={() => playAgain()}
        >
          <span className="button_playAgain_letter">Play again</span>
        </button>
      </section>
    </Modal>
  )
}

const ModalResults = { ModalResultConnected, ModalResultNotConnected }

export default ModalResults
