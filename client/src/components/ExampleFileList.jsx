import { useEffect } from "react";
import { useFileContext, useLoadingApi } from "../hooks"

export const ExampleFileList = () => {

    const [loading, setLoading, err, setErr] = useLoadingApi();
    const { files, getUserFiles } = useFileContext();

    useEffect(() => {
        setLoading(true);
        getUserFiles()
            .then(() => setLoading(false))
            .catch(err => {
                console.error(err);
                setErr(err.message);
                setLoading(false);
            })
    }, []);

    if (loading) return <p>Loading...</p>
    if (err) return <p>{err}</p>
    return (
        <div>
            <h3>File List</h3>
            {!files.length && <p>No files found</p>}
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        <a href={file.url} target="__blank">{file.filename}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}