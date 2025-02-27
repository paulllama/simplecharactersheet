import { Route, Switch } from "wouter";
import { Container } from "react-bootstrap"
import { CharacterList } from '@scc/pages/CharacterList/index';
import { NewCharacter } from '@scc/pages/NewCharacter/index';
import { CharacterSheet } from '@scc/pages/CharacterSheet/index';
import { Home } from '@scc/pages/Home/index';
import { NotFound } from '@scc/pages/_404';

export const Routes = () => {
    return (
        <Container>
            <Switch>
                <Route path="/characters" component={CharacterList} />
                <Route path="/games/:gameId/characters/:characterId" component={CharacterSheet} />
                <Route path="/games/:gameId/" component={NewCharacter} />
                <Route path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Container>
    )
}