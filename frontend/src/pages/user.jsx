import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import { Button } from '@mui/material';
import MenuItems from './userPopups/menuitems';

function User() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/menus');
                setMenus(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: "#A020F0" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="logo" sx={{ marginRight: 2 }}>
                        <img src="logos.png" alt="Logo" style={{ height: '50px' }} />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
                        Epic Eats
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    {menus.map((menu,index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={menu.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image= {index%3===0 ? "food1.jpg" : index%3===1 ?  "food2.jpeg" : "food3.jpg"  }
                                    alt={menu.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {menu.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {menu.description}
                                    </Typography>
                                    <MenuItems id={menu.id} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default User;
