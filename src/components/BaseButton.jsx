const BaseButton = ({
  type = "submit",
  children,
  label,
  onClick,
  className = "",
}) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children ? children : label}
    </button>
  );
};

export { BaseButton };
