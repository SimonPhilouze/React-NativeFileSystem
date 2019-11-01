import React, { Fragment, useState } from 'react';

const App = () => {

  const [contentFile, setContentFile] = useState("");
  const [fileHandle, setFileHandle] = useState(null);

  async function writeFile() {
    // Create a writer (request permission if necessary).
    const writer = await fileHandle.createWriter();
    // Make sure we start with an empty file
    await writer.truncate(0);
    // Write the full length of the contents
    await writer.write(0, contentFile);
    // Close the file and write the contents to disk
    await writer.close();
  }

  const handleFileInput = async () => {
    const fileHandle = await window.chooseFileSystemEntries();
    const file = await fileHandle.getFile();
    const content = await file.text();

    setFileHandle(fileHandle)
    setContentFile(content);
  }

  return (
    <Fragment>
        <header>
          <p>{fileHandle && fileHandle.name}</p>
        </header>
        <div className="editor">
          <div className="input-file">
            {!contentFile ?
              <Fragment>
                <p className="input-text">Click or Drag and Drop</p>
                <input type="file" onClick={handleFileInput}/>
              </Fragment>
            : <textarea value={contentFile} onChange={(event) => setContentFile(event.target.value)} />}
          </div>
        </div>
        <footer>
          <a className="link" target="_blank" href="https://github.com/HitAngry/React-NativeFileSystem">Github repo</a>
          <button className="save-button" onClick={writeFile} disabled={contentFile.length <= 0}>Save</button>
        </footer>
    </Fragment>
  )
} 

export default App;