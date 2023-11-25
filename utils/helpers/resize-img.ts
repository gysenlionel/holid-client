import Resizer from "react-image-file-resizer";

export const resizeFile = (file, outputType: "base64" | "blob" | "file") =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800,
            800,
            "JPEG",
            50,
            0,
            (uri) => {
                resolve(uri)
            },
            outputType
        )
    })