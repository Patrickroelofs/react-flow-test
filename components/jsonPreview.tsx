const JSONPreview = ({json}: any) => {
    return (
        <div className="fixed top-0 right-0 z-50 w-auto p-4 m-4 rounded-md bg-slate-300">
            <pre className="text-xs">
                {JSON.stringify(json, null, 2)}
            </pre>
        </div>
    )
}

export default JSONPreview