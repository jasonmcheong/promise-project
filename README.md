# Esperanto - Promise Project
### Summary
An application built using React and Amazon Web Services (AWS) that automates the process of sending and saving data from users that promise to learn Esperanto (an international language). Included is the capability to function offline with the use of a Service Worker, IndexedDB and Background Sync.

As the application continues to grow, so will the support for many more languages. Down the line, the application has the potential to reach a global audience thereby spreading awareness of Esperanto and bringing my client closer to his goal of 100,000,000 promises. 

### Offline
In offline mode or when a unreliable connection is present, the application will retain the user data in IndexedDB until a strong internet connection is established. Once Background Sync detects that a solid connection was established then it will automatically send the user data to AWS. These fundamental features meet the requirements for what is considered a progressive web application.

### Links
* [Multilingual](https://ea-mondo.org/pp/multi/)
* [English](https://ea-mondo.org/pp/english/)
* [Spanish](https://ea-mondo.org/pp/hispana/)
