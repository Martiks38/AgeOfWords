function Modal({
  children,
  styleModify,
}: {
  children: JSX.Element | JSX.Element[]
  styleModify?: string
}) {
  return <article className={`modal ${styleModify}`}>{children}</article>
}

export default Modal
