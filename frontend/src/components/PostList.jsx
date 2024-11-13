import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default function PostList({lists}) {
    return (
        <List sx={{width: '100%', bgcolor: 'background.paper'}} >
            {lists.map((item) => (
                <ListItem alignItems="flex-start" key={item.id} style={{display:'flex'}}>
                    <ListItemAvatar>
                        <Avatar alt={item.username} src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{color: 'text.primary', display: 'inline'}}
                                >
                                    {item.username}
                                </Typography>
                                --{item.content}
                                <Divider></Divider>
                                risk score: {(item.safetyIndex)?.toString()||"N/A"}/10
                            </React.Fragment>
                        }
                    />
                    <button style={{backgroundColor:'pink', borderRadius:'10px'}} >send care</button>
                </ListItem>
            ))}
            <Divider variant="inset" component="li"/>
        </List>
    );
}
