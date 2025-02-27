// import { useLocation } from 'wouter'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const NAVBAR_ID = 'scc-links'

export const Header = () => {
	// const [url, navigate] = useLocation();

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
			<Navbar.Brand href="/">
				<img src='/logo192.png' alt='Simple Character Sheet' />
				{' '}
				<span className='d-none d-lg-inline'>Simple Character Sheet</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls={NAVBAR_ID} />
			<Navbar.Collapse id={NAVBAR_ID} className="justify-content-end">
				<Nav>
					<SignedOut>
						<Nav.Item>
							<SignInButton />
						</Nav.Item>
					</SignedOut>
					<SignedIn>
						<Nav.Link href="/characters">
							My Characters
						</Nav.Link>
						<Nav.Item >
							<UserButton />
						</Nav.Item >
					</SignedIn>
				</Nav>
			</Navbar.Collapse>
			</Container>
      	</Navbar>
	)
}
