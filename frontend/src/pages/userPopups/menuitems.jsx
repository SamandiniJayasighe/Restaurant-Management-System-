import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';

function MenuItems({ id }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (id) {
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
      fetchMenu();
    }
  }, []);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Menu Details
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Menu Item Details</DialogTitle>
        <DialogContent>
        {!loading && !error && menu.length > 0 && (
            <Grid container spacing={3} sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%'
            }}>
              {menu.map((item) => (
                <Grid item xs={12}  key={item.id} >
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
    </div>
  );
}

export default MenuItems;
