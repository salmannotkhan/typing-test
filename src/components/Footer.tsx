import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Footer.scss";

interface Contributor {
	avatar_url: string;
	contributions: number;
	events_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	gravatar_id: string;
	html_url: string;
	id: number;
	login: string;
	node_id: string;
	organizations_url: string;
	received_events_url: string;
	repos_url: string;
	site_admin: boolean;
	starred_url: string;
	subscriptions_url: string;
	type: string;
	url: string;
}

export default function Footer() {
	const [contributors, setContributors] = useState<Contributor[]>([]);
	const { timerId } = useSelector((state: State) => state.time);
	const [showList, setShowList] = useState<boolean>(false);
	useEffect(() => {
		const URL =
			"https://api.github.com/repos/salmannotkhan/typing-test/contributors";
		fetch(URL)
			.then((res) => res.json())
			.then((data: Contributor[]) =>
				data.filter(
					(contributor) => contributor.login !== "salmannotkhan"
				)
			)
			.then((filtered) => setContributors(filtered));
	}, []);

	return (
		<div className={`bottom-area ${timerId ? "hidden" : ""}`}>
			<span className="hint">
				<kbd>Ctrl</kbd> + <kbd>k</kbd> to open command pallet
			</span>
			<span className="hint">
				<kbd>Tab</kbd> to restart test
			</span>
			<footer>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://www.github.com/salmannotkhan/typing-test">
					<span>&lt;/&gt;</span> github
				</a>
				<span>
					created by{" "}
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.github.com/salmannotkhan">
						@salmannotkhan
					</a>
				</span>
				{showList ? (
					<div className="contributor-list" onBlur={console.log}>
						<h2>contributors</h2>
						{contributors.map((contributor) => (
							<a
								className="contributor"
								href={contributor.html_url}
								target="_blank"
								rel="noreferrer"
								key={contributor.node_id}>
								<img
									height={50}
									width={50}
									src={contributor.avatar_url}
									alt={`${contributor.login}'s avatar`}
								/>
								<div className="contributor-details">
									<div>@{contributor.login}</div>
									<div>
										{contributor.contributions} commits
									</div>
								</div>
							</a>
						))}
					</div>
				) : null}
				<button onClick={() => setShowList((s) => !s)}>
					{showList ? "x close" : "{} contributors"}
				</button>
			</footer>
		</div>
	);
}
