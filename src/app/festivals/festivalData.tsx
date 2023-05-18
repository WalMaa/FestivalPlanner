
const artistsData = [
  { id: 1, name: "Arctic Monkeys", genre: "Indie Rock" },
  { id: 2, name: "Florence + The Machine", genre: "Indie Pop" },
  { id: 3, name: "Kendrick Lamar", genre: "Hip Hop" },
  { id: 4, name: "The Strokes", genre: "Rock" },
  { id: 5, name: "Tame Impala", genre: "Psychedelic Rock" },
  { id: 6, name: "Robyn", genre: "Pop" },
  { id: 7, name: "Childish Gambino", genre: "Hip Hop" },
  { id: 8, name: "Lana Del Rey", genre: "Pop" },
  { id: 9, name: "Vampire Weekend", genre: "Indie Pop" },
  { id: 10, name: "Disclosure", genre: "Electronic" },
  { id: 11, name: "Foo Fighters", genre: "Rock" },
  { id: 12, name: "Beyoncé", genre: "Pop/R&B" },
  { id: 13, name: "Daft Punk", genre: "Electronic" },
  { id: 14, name: "Sia", genre: "Pop" },
  { id: 15, name: "Red Hot Chili Peppers", genre: "Alternative Rock" },
  { id: 16, name: "Lorde", genre: "Pop/Indie" },
  { id: 17, name: "The Weeknd", genre: "R&B/Pop" },
]

const festivals = [
  {
    id: 1,
    name: "Summer Music Festival",
    startDate: "2023-08-10",
    endDate: "2023-08-12",
    location: "Oulu",
    description: "A music festival featuring various genres and artists.",
    artists: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]
  },

  {
    id: 2,
    name: "Winter Wonderland",
    startDate: "2023-04-20",
    endDate: "2023-12-21",
    location: "Lappeenranta",
    description: "A winter festival filled with snow activities and entertainment.",
    artists: [
      11, 12, 13, 4, 14, 15, 7, 16, 17, 1
    ]
  }

];

export {festivals, artistsData};