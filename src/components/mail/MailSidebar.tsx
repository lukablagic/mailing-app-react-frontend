export const MailSidebar = () => {
  const mails = [
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
    {
      id: 1,
      title: "Mail 1",
      content: "Mail 1 content",
    },
    {
      id: 2,
      title: "Mail 2",
      content: "Mail 2 content",
    },
    {
      id: 3,
      title: "Mail 3",
      content: "Mail 3 content",
    },
    {
      id: 4,
      title: "Mail 4",
      content: "Mail 4 content",
    },
  ];

  return (
    <div className="flex  w-1/3  shrink-0 flex-col gap-4 rounded-tl-lg bg-blue-950 p-4 text-white ">
      <div className="h-full w-full flex flex-col gap-2">
        <div className="mx-2  flex shrink flex-row items-center justify-between">
          <h1 className="mx-2 text-xl font-bold text-white">Folder name </h1>
        </div>
        <div className="ml-8 shrink grow basis-0 gap-4 overflow-auto text-gray-300">
          {mails.map((mail, index) => (
            <div key={index} className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">{mail.title}</h2>
              <p className="text-sm">{mail.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
