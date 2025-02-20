import { Route, Switch } from "wouter";
import { CharacterList } from '../pages/CharacterList/index.jsx';
import { NewCharacter } from '../pages/NewCharacter/index.jsx';
import { CharacterSheet } from '../pages/CharacterSheet/index.jsx';
import { Home } from '../pages/Home/index.jsx';
import { NotFound } from '../pages/_404.jsx';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/characters">
                <CharacterList />
            </Route>
            <Route path="/games/:gameId/characters/:characterId" component={CharacterSheet} />
            <Route path="/games/:gameId/" component={NewCharacter} />
            <Route path="/" component={Home} />
            <Route component={NotFound} />
        </Switch>
    )
}