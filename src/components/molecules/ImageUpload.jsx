import FileInput from "../atoms/FileInput";


const ImageUpload = ({onImageSelect, onUrlInput}) => {
    return (
    <>
        <p>Upload from file:</p>
        <FileInput onChange={onImageSelect}/>
    </>
         
    

);
};

export default ImageUpload;