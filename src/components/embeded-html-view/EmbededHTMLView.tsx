interface EmbededHTMLViewProps {
  html: string;
}
export const EmbededHTMLView = ({ html }: EmbededHTMLViewProps) => {
  return <div className="m-6" dangerouslySetInnerHTML={{ __html: html }}></div>;
};
