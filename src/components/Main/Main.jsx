import React from 'react';
import { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';


export const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult    //if the showResult is false then show the below content
                    ? <>

                        <div className="greet">
                            <p><span>Hello, Developer</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summerize the concept:Urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>

                    </>


                    :    //if the showResult is true then show the below content
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                            ?<div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                            
                        </div>
                    </div>

                }


                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" /></div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate information. Always verify the information with external sources before making decisions.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;
