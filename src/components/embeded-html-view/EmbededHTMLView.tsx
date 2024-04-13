interface EmbededHTMLViewProps {
  html: string;
}
export const EmbededHTMLView = ({ html }: EmbededHTMLViewProps) => {
  return <div className="m-4" dangerouslySetInnerHTML={{ __html: html }}></div>;
};
