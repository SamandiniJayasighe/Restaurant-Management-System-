
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
import { Icon,IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function UpdateMenu({ onSave,previousMenu }) {
    const [open, setOpen] = useState(false);
    const [menuName, setMenuName] = useState(previousMenu.name);
    const [restaurantId, setRestaurantId] = useState(previousMenu.restaurantId);

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
            const response = await axios.put(`http://localhost:8080/api/menus/${previousMenu.id}`, menuDetails);
            console.log('Menu updated:', response.data);
            setOpen(false);
            onSave(); // Call the onSave function passed as a prop
        } catch (error) {
            console.error('Error updating menu:', error);
        }
    };

    return (
        <div>
             <IconButton edge="end" color="inherit" aria-label="edit"  onClick={handleClickOpen}>
                                        <Icon><EditIcon/></Icon>
                                    </IconButton>
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

export default UpdateMenu