const InfoText = ({ label, value, className }) => {
  return (
    <p className={className}>
      <strong>{label}</strong> {value}
    </p>
  );
};

export default InfoText;