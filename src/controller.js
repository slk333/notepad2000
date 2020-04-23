
  // sample data
  export const sampleData = {
    test: {
      title: "test",
      content: `write anything!`,
      modificationDate: "2020-04-16T13:14:13.585Z",
    },
    "avocado recipe": {
      title: "avocado recipe",
      content: `Mashed avocado is more creamy and luxurious than sliced avocado (think guacamole vs. plain avocado). But don’t mash it on the toast! You risk poking holes in your toast or smashing it. Cut your avocados in half, remove the pit, scoop the flesh into a bowl or onto the side of your plate, and mash it up with a fork.`,
      modificationDate: "2020-04-16T13:12:13.585Z",
    },
  };
  export function checkStorage(){
    if (localStorage.getItem("notes") === null) {
      localStorage.setItem("notes", JSON.stringify(sampleData));
    }
  
  }

















