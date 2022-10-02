import { useEffect } from 'react'
import { SetState } from '../types'

export const useCloseModal = (view: boolean, setView: SetState<boolean>) => {
  useEffect(() => {
    const checkCloseClick = (e: MouseEvent | KeyboardEvent) => {
      const { target } = e

      if ((e as KeyboardEvent)?.key === 'Escape')
        return setView((prevView) => !prevView)

      if (
        (!(target as HTMLElement).closest('.modal') &&
          !(target as HTMLElement).closest('.button_stadistics')) ||
        (target as HTMLElement).closest('.modal__close')
      ) {
        return setView((prevView) => !prevView)
      }
    }

    if (view) {
      document.addEventListener('click', checkCloseClick)
      document.addEventListener('keydown', checkCloseClick)
    }

    return () => {
      document.removeEventListener('click', checkCloseClick)
      document.removeEventListener('keydown', checkCloseClick)
    }
  }, [view])
}
