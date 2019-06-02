import React from 'react';

const Alert = props => {
    const { msg, add_time, cancel } = props.alertInfo;

    return (
        <div id="alert" className="Alert">
            <h3>
                {msg} ({props.time})
            </h3>
            <button className="button" onClick={props.reset}>
                {add_time}
            </button>
            <button className="button" onClick={props.close}>
                {cancel}
            </button>
        </div>
    );
};

export default Alert;
