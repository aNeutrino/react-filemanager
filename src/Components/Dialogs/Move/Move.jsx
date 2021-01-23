import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import { setVisibleDialogMove, setSelectedFolderSublist, setGoalName, refreshFileList } from '../../../Actions/Actions.js';
import FileListSublist from '../../FileList/FileListSublist/FileListSublist.jsx';

class FormDialog extends Component {

    componentDidMount() {
        this.setState({ isRecursive: true })
      }
    
    isRecursiveChange(event) {
        this.setState({ isRecursive: event.target.checked })
    };


    render() {
        const {
            selectedPath, handleClose, handleSave, open,
            canMove,
        } = this.props;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-move" fullWidth={true} maxWidth={'sm'}>
                <form>
                    <DialogTitle id="form-dialog-move">
                        Change replication to <strong style={{ color: 'green' }}>{selectedPath[selectedPath.length - 1]}</strong>
                    </DialogTitle>
                    <DialogContent>
                        <FileListSublist />
                    </DialogContent>
                    <DialogActions>
                        <FormControlLabel
                            control={<Checkbox defaultChecked={true} onChange={(e) => this.isRecursiveChange(e)} />}
                            label="Is recursive"
                        />
                        <Button onClick={handleClose} color="primary" type="button">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={(e) => handleSave(e, this.state.isRecursive)} disabled={!canMove} type="submit">
                            Set replication 
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    // prevent moving to same folder
    const canMove = state.path.join('') !== state.pathSublist.join('') + (state.selectedFolderSublist ? state.selectedFolderSublist.name : '');

    return {
        open: state.visibleDialogMove,
        selectedFolderSublist: state.selectedFolderSublist,
        selectedPath: state.selectedFolderSublist ? [...state.pathSublist, state.selectedFolderSublist.name] : [],
        selectedFiles: state.selectedFiles,
        pathSublist: state.pathSublist,
        canMove: state.selectedFolderSublist && canMove,
        isRecursive: true
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleClose: (event) => {
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleDialogMove(false));
        },
        handleSave: (event, isRecursive) => {
            dispatch(setGoalName(isRecursive));
            dispatch(refreshFileList());
            dispatch(setSelectedFolderSublist(null));
            dispatch(setVisibleDialogMove(false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
