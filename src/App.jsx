import './App.css';
import {useEffect, useState} from "react";
import {Transition} from 'react-transition-group';

function App() {
    const [loaderVisible, setLoaderVisible] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLoaderVisible(true)
        }, 2000)
        setTimeout(() => {
            setLoaderVisible(false)
        }, 5000)
    }, [])
    return (
        <div className="App">
            <button onClick={() => {
                setLoaderVisible(!loaderVisible)
            }}>{loaderVisible ? 'hide' : 'show'}
            </button>
            <div className="wrap">
                <Transition
                    in={loaderVisible}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                    onEnter={() => console.log('enter')}
                >
                    {state => <div className={`circle ${state}`}/>}
                </Transition>
            </div>
        </div>
    );
}

export default App;
