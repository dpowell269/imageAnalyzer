const FileInput = ({onChange}) => (
    <input type="file" accept="image/*" onChange={onChange} />
)

export default FileInput;