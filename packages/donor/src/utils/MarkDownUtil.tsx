import { TypographyVariant } from "@mui/material";
import Markdown from "markdown-to-jsx";

interface ParseMarkdownLinks {
  text: string;
  variant?: TypographyVariant;
}

export const ParseMarkdownLinks = ({ text }: ParseMarkdownLinks) => {
  /**
       *  <Typography variant={variant} sx={{ wordWrap: "break-word" }}>
              {content?.map((word, idx) => (
                  word.match(URL_LINK_REGEX) ? (
                      <Fragment key={word + idx}>
                          <AnchorTag
                              href={word}
                              linkName={word}
                              target="_blank"
                              rel="noreferrer"
                          >
                              {word}
                          </AnchorTag>
                      </Fragment>
                  ) : (
                      <Fragment key={word + idx}>
                          {word}&nbsp;
                      </Fragment>
                  )
              ))
              }
          </Typography>
       * 
       */
  return <Markdown options={{ slugify: (str) => str }}>{text}</Markdown>;
};
