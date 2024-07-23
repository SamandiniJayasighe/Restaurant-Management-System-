
import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function Addmenu({ onSave }) {
    const [open, setOpen] = useState(false);
    const [menuName, setMenuName] = useState('');
    const [restaurantId, setRestaurantId] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const menuDetails = {
                name: menuName,
                restaurantId: parseInt(restaurantId, 10),
                menuItems: [],
            };
            const response = await axios.post(`http://localhost:8080/api/menus`, menuDetails);
            console.log('Menu updated:', response.data);
            setOpen(false);
            onSave(); // Call the onSave function passed as a prop
        } catch (error) {
            console.error('Error updating menu:', error);
        }
    };

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20
                }}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Menu</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="menuName"
                        label="Menu Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="restaurantId"
                        label="Restaurant ID"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Addmenu