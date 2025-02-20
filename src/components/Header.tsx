import { useLocation } from 'wouter'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export const Header = () => {
	const [url, navigate] = useLocation();

	return (
		<header>
			<nav>
				<a href="/">
					Home
				</a>
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<a href="/characters">
						My Characters
					</a>
					<UserButton />
				</SignedIn>
			</nav>
		</header>
	);
}
