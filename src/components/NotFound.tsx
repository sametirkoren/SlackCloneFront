import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react'

 const NotFound = () => {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth:800}}>
                    <Segment>
                        <Header>
                            <Icon name="search"/>
                            404 - Sayfa Bulunamadı
                        </Header>
                        <Segment.Inline>
                            <Button as={Link} to="/login" primary>
                                Giriş Sayfasına Geri Dön
                            </Button>
                        </Segment.Inline>
                    </Segment>
            </Grid.Column>
        </Grid>
    )
}
export default NotFound;
