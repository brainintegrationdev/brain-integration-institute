import { useEffect, useRef } from "react"

const UploadWidget = () => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary,
        console.log(cloudinaryRef.current)
        widgetRef.current = cloudinary.current.createUploadWidget({
            cloudName: '',
            uploadPreset: '',
        }, (error, result) => {
            console.log(result)
        })
    })
    return(
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    )
}

const StudyGDownloadWidget = () => {
    
    return(
        <button>Download Study Guide</button>
    )
}

const PayFeeWidget = () => {
    
    return(
        <button>Pay Assessment Fee</button>
    )
}

const TakeAssessmentWidget = () => {
    
    return(
        <button>Take Assessment</button>
    )
}


export {UploadWidget, StudyGDownloadWidget, PayFeeWidget, TakeAssessmentWidget}