import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { GithubIcon } from "./ui/github";
import { LinkedinIcon } from "./ui/linkedin";
import { TwitterIcon } from "./ui/twitter";

export const Footer = () => (
  <footer className="flex items-center justify-between pt-8">
    <ul className="horizontal space-x-4">
      <li>
        <Button
          size="icon-lg"
          variant="secondary"
          render={
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/deepso7"
            >
              <GithubIcon className="flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-200 select-none hover:bg-accent" />
            </a>
          }
        />
      </li>
      <li>
        <Button
          size="icon-lg"
          variant="secondary"
          render={
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/deepso7"
            >
              <TwitterIcon className="flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-200 select-none hover:bg-accent" />
            </a>
          }
        />
      </li>
      <li>
        <Button
          size="icon-lg"
          variant="secondary"
          render={
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/deepso7"
            >
              <LinkedinIcon className="flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-200 select-none hover:bg-accent" />
            </a>
          }
        />
      </li>
    </ul>

    <ModeToggle />
  </footer>
);
