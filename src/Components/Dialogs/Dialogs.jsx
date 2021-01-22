import React from 'react';
import DialogContent from './Content/Content.jsx';
import DialogMove from './Move/Move.jsx';

function Dialogs(props) {
    return (
        <div className="Dialogs">
            <DialogContent />
            <DialogMove />
        </div>
    );
}

export default Dialogs;
