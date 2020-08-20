import React from 'react';
import logo from './logo.svg';
import pingingIcon from './pinging.svg';
import './App.css';
import { pingTest, downloadTest, uploadTest } from './speedtest';

const STATE_START = "start";
const STATE_TESTING_PING = "pinging";
const STATE_TESTING_DOWN = "down";
const STATE_TESTING_UPLOAD = "upload";
const STATE_COMPLETE = "complete";

function App() {
  const [ state, setState ] = React.useState(STATE_START);
  const [ pingTime, setPingTime ] = React.useState(0);
  const [ downSpeed, setDownSpeed ] = React.useState(0);
  const [ pendingDownSpeed, setPendingDownSpeed ] = React.useState(0);
  const [ upSpeed, setUpSpeed ] = React.useState(0);
  const [ pendingUpSpeed, setPendingUpSpeed ] = React.useState(0);
  const [ downloadError, setDownloadError ] = React.useState(null);
  const [ uploadError, setUploadError ] = React.useState(null);

  React.useEffect(() => {
    if (state === STATE_TESTING_PING) {
      pingTest().then(t => {
        setState(STATE_TESTING_DOWN);
        setPingTime(t);
      });
    }
    else if (state === STATE_TESTING_DOWN) {
      downloadTest(setPendingDownSpeed)
      .then(setDownSpeed, setDownloadError)
      .then(() => setState(STATE_TESTING_UPLOAD));
    }
    else if (state === STATE_TESTING_UPLOAD) {
      uploadTest(setPendingUpSpeed)
      .then(setUpSpeed, setUploadError)
      .then(() => setState(STATE_COMPLETE));
    }
  }, [state]);

  function reset () {
    setState(STATE_START);
    setPingTime(0);
    setPendingDownSpeed(0);
    setDownSpeed(0);
    setPendingUpSpeed(0);
    setUpSpeed(0);
    setDownloadError(null);
    setUploadError(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        { state === STATE_START &&
          <button className="start-btn" onClick={() => setState(STATE_TESTING_PING)}>
            <img src={logo} className="App-logo" alt="logo" />
          </button>
        }
        
        { state === STATE_TESTING_PING && 
          <p>
            Pinging <br/>
            <img src={pingingIcon} width={400} />
          </p>
        }
        { pingTime > 0 &&
          <p>Ping Time: {pingTime.toFixed(3)} ms</p>
        }

        {
          downloadError ? 
          <p>Error running download test</p>
          : (
            state === STATE_TESTING_DOWN ?  
            (
              <p>
                Running Download Test <br/>
                {formatSpeed(pendingDownSpeed)}
              </p>
            ) : 
            downSpeed > 0 &&
              <p>Download Speed: {formatSpeed(downSpeed)}</p>
          )
        }

        {
          uploadError ? 
          <p>Error running upload test</p>
          : (
            state === STATE_TESTING_UPLOAD ?  
            (
              <p>
                Running Upload Test <br/>
                {formatSpeed(pendingUpSpeed)}
              </p>
            ) : 
            upSpeed > 0 &&
              <p>Upload Speed: {formatSpeed(upSpeed)}</p>
          )
        }

        { state === STATE_COMPLETE && 
          <button onClick={() => reset()}>Start Again</button>
        }
      </header>
    </div>
  );
}

export default App;

function formatSpeed (bytesPerSecond) {
  if (bytesPerSecond > 1e6) return `${(bytesPerSecond / 1e6).toFixed(1)} MB/s`;
  if (bytesPerSecond > 1e3) return `${(bytesPerSecond / 1e3).toFixed(1)} KB/s`;
  return `${bytesPerSecond.toFixed(1)} B/s`;
}