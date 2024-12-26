# Node-Angular-Project

# Team Members: 
Marc Monin

No?mie Mazepa

Ariste Mathiot

Lorrain Morlet


# SUJET

Weather forecast app that show the weather of a selected city
## must include :
- Hour per hour temperature in a graph (HighChart)
- Selection of the city
- Choosing favorite cities
- rain probability

## Secondary needs : 
- Authentication process
- About Page
- Settings page


## Pages scheme
```mermaid
graph TD
    A[Home Page] --> C[User Authentication Page]
    H --> B[Account lobby]
    J --> C
    A --> E[About Page]
    O --> F[ag-Grid Screen]
    M --> F
    O --> G[HighCharts Screen]
    M --> G
    C --> H[Login]
    C --> I[Register]
    C --> J[Forgot Password]
    D --> K[Profile Settings]
    D --> L[Notification Settings]
    E --> N[Project Information]
    I --> H
    B --> D[Settings Page]
    B --> E
    B --> O[City Selector]
    B --> M[Favorite cities]
```

