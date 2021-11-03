import { Component } from "react";
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

interface State {
	contributors: [Contributor] | [];
	showList: boolean;
}
export default class Footer extends Component {
	state: State = {
		contributors: [],
		showList: false,
	};
	setContributors = async () => {
		if (this.state.contributors.length !== 0) {
			this.setState({ contributors: [] });
			return;
		}
		const res = await fetch(
			"https://api.github.com/repos/salmannotkhan/typing-test/contributors"
		);
		const data: [Contributor] = await res.json();
		const filtered = data.filter(
			(contributor) => contributor.login !== "salmannotkhan"
		);
		this.setState({ contributors: filtered });
	};

	componentDidMount() {
		this.setContributors();
	}

	render() {
		return (
			<div className="bottom-area">
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
					{this.state.showList ? (
						<div className="contributor-list" onBlur={console.log}>
							<h2>contributors</h2>
							{this.state.contributors.map((contributor) => (
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
					<button
						onClick={(e) =>
							this.setState({ showList: !this.state.showList })
						}>
						{this.state.showList ? "x close" : "{} contributors"}
					</button>
				</footer>
			</div>
		);
	}
}
