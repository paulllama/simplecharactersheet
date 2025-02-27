import {
    SignedIn,
    SignedOut,
    RedirectToSignUp,
} from '@clerk/clerk-react'
import { Route, Switch } from "wouter";
import { Container } from "react-bootstrap"
import { CharacterList } from '@scc/pages/CharacterList/index';
import { NewCharacter } from '@scc/pages/NewCharacter/index';
import { CharacterSheet } from '@scc/pages/CharacterSheet/index';
import { Home } from '@scc/pages/Home/index';
import { NotFound } from '@scc/pages/_404';
import React from "react";

const SignedInRoute = ({ path, children }: { 
    path: string,
    children: React.ReactNode,
}) => (
    <Route path={path}>
        <SignedIn>
            {children}
        </SignedIn>
        <SignedOut>
            <RedirectToSignUp />
        </SignedOut>
    </Route>
)

export const Routes = () => {
    return (
        <Container>
            <Switch>
                <SignedInRoute path="/characters">
                    <CharacterList />
                </SignedInRoute>
                <Route path="/games/:gameId/characters/:characterId" component={CharacterSheet} />
                <SignedInRoute path="/games/:gameId/">
                    <NewCharacter />
                </SignedInRoute>
                <Route path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Container>
    )
}