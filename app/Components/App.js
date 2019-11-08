import React, { Fragment, useState } from 'react';

const App = () => {

  const [contentFile, setContentFile] = useState("");
  const [pathDirectory, setPathDirectory] = useState([]);

  // async function writeFile() {
  //   // Create a writer (request permission if necessary).
  //   const writer = await fileHandle.createWriter();
  //   // Make sure we start with an empty file
  //   await writer.truncate(0);
  //   // Write the full length of the contents
  //   await writer.write(0, contentFile);
  //   // Close the file and write the contents to disk
  //   await writer.close();
  // }

  const handleFileInput = async () => {
    const handle = await window.chooseFileSystemEntries({
      type: 'openDirectory'
    });

    const entries = await handle.getEntries();
    let foo = [];

    for await (const entry of entries) {
      console.log(entry)
      foo.push({
        type: entry.isFile ? 'File' : 'Directory',
        entry: entry,
        name: entry.name
      })
    }
    setPathDirectory(foo);
  }

  return (
    <Fragment>
        <div className="editor">
          <div className="pathDirectory">
            <div className="contentArbo">
              {pathDirectory.length <= 0 ? <p>no data</p> : pathDirectory.map(item => {
                return (
                  <div className="section">
                    <img className="iconPath" src={`${item.type === "File" ? "/assets/file.png" : "/assets/folder.png"}`} />
                    <span className="nameItemPatchDirectory">{item.name}</span><br/>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="input-file">
            {!contentFile ?
              <Fragment>
                <p className="input-text">Click and Load</p>
                <input type="file" onClick={handleFileInput}/>
              </Fragment>
            : <textarea value={contentFile} onChange={(event) => setContentFile(event.target.value)} />}
          </div>
        </div>
        {/* <footer>
          <button className="save-button" onClick={writeFile} disabled={contentFile.length <= 0}>Save</button>
        </footer> */}
    </Fragment>
  )
} 

export default App;