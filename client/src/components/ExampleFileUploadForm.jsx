import { useState } from "react";
import { useFileContext, useLoadingApi } from "../hooks";

export const ExampleFileUploadForm = () => {

    const { uploadFile } = useFileContext();
    const [fields, setFields] = useState({ filename: '' });
    const [submitting, setSubmitting, err, setErr] = useLoadingApi(false);

    const handleChange = e => {
        const { name, value, type, files } = e.target;
        setFields(prev => ({
            ...prev, [name]: type === 'file' ? files[0] : value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        if (err) setErr(null);
        Object.keys(fields).forEach(k => formData.append(k, fields[k]))
        setSubmitting(true);
        try {
            await uploadFile(formData);
            setSubmitting(false);
        } catch (err) {
            console.error(err);
            setErr(err.message);
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Filename" name='filename' value={fields.filename} onChange={handleChange} required />
            <input type="file" name='file' onChange={handleChange} required />
            <button type='submit' disabled={submitting}>{submitting ? 'Uploading...' : 'Upload'}</button>
            {err && <p style={{ color: 'red' }}>{err}</p>}
        </form>
    )
}