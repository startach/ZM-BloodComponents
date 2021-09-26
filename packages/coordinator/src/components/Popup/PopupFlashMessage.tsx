import { Fade } from '@material-ui/core';

type PopupFlashMessageProps = {
    message : string, 
    showFlash  : boolean,
    styleType? : string,
};

export default function PopupFlashMessage ( {
    message,
    showFlash,
    styleType,
}: PopupFlashMessageProps) {

    return (
        <div style={{zIndex: 100 ,position: 'absolute', bottom: '50px', left: '100px'}}>
            <Fade in={showFlash} timeout={{ enter: 300, exit: 800 }}>
                <div style={{backgroundColor: 'yellow', padding: '5px'}}>
                  <h1>{message}</h1>
                </div>
            </Fade>
        </div>
    )
};
