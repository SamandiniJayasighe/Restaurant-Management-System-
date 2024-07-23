import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function MenuItemsAdmin({ id }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [image, setImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClickOpen = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedItem(null);
    setImage(null);
  };

  const handleAddClickOpen = () => {
    setSelectedItem({
      name: '',
      description: '',
      price: 0,
      imageUrl: ''
    });
    setEditOpen(true);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/menus/${id}/items`);
      setMenu(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', selectedItem.name);
    formData.append('description', selectedItem.description);
    formData.append('price', selectedItem.price);
    if (image) {
      formData.append('image', image);
      formData.append('imageUrl', "base");
    } else {
      formData.append('imageUrl', selectedItem.imageUrl);
    }

    try {
      if (selectedItem.id) {
        await axios.put(`http://localhost:8080/api/menus/items/${selectedItem.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMenu(menu.map((item) => (item.id === selectedItem.id ? selectedItem : item)));
        fetchMenu();
      } else {
        const response = await axios.post(`http://localhost:8080/api/menus/${id}/items`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMenu([...menu, response.data]);
        fetchMenu();
      }
      handleEditClose();

    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/menus/items/${itemId}`);
      setMenu(menu.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMenu();
    }
  }, [id]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Menu Details
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
          Menu Item Details
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginLeft: 'auto' }} 
            onClick={handleAddClickOpen}
          >
            Add Item
          </Button>
        </DialogTitle>
        <DialogContent>
          {!loading && !error && menu.length > 0 && (
            <Grid container spacing={3}>
              {menu.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Card>
                    {item.imageUrl && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={`http://localhost:8080/images/${item.imageUrl}`}
                        alt={item.name}
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Grid container spacing={1} justifyContent="flex-end" padding={1}>
                        <Grid item>
                          <Button variant="outlined" color="primary" onClick={() => handleEditClickOpen(item)}>
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" color="secondary" onClick={() => handleDelete(item.id)}>
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {selectedItem && (
        <Dialog open={editOpen} onClose={handleEditClose} fullWidth>
          <DialogTitle>{selectedItem.id ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={selectedItem.name}
              onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={selectedItem.description}
              onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
            />
            <TextField
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={selectedItem.price}
              onChange={(e) => setSelectedItem({ ...selectedItem, price: parseFloat(e.target.value) })}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default MenuItemsAdmin;
