**Storytelling Idee:**
Wir haben uns für ein Design mit Postkarten entschieden, weil es eine emotionale und zugleich leicht verständliche Darstellungsform ist. Postkarten stehen für Reisen, Austausch und das Sammeln von Eindrücken. Dies spiegelt unsere Idee wider: Werte aus verschiedenen Teilen der Welt zusammenbringen und miteinander vergleichen. Wie man beim Reisen neue Orte entdeckt, entdeckt man die Zustände der Air Pollution von Orten. Die Kombination von Weltkarte und Postkarte erlaubt uns zudem, komplexe Informationen spielerisch zu vermitteln und dabei sowohl die globale Dimension des Themas als auch die lokalen Besonderheiten sichtbar zu machen.

Weltkarte = Übersichtsebene → Nutzer erkennt sofort die internationale Spannweite und kann eine Stadt auswählen.
Postkarte = Detailansicht → Daten erscheinen wie kleine Stempel oder Siegel und werden klar, kompakt und ansprechend erklärt. Es erscheinen die aktuellsten gemessenen Werte, sofern man noch kein Datum und keine Uhrzeit ausgewählt hat.

Zusatzinfo zu den Werten: Die Bewertung der Werte haben wir mit Hilfe der WHO Guidlines und den Pollenflug-Gefahrenindex des Deutschen Wetterdienstes (DWD)vorgenommen. Wir können sie gerne noch auf der Website erwähnen, wussten aber nicht, ob das wirklich notwendig ist.

Kurze Erklärung zur URL: Ich habe im zweiten Semester meine Domain nach dem Namen des Semesterprojektes benannt, anstatt mit meinem Namen. Aus diesem Grund lautet die URL für dieses Projekt nun im3.uv-index-usa.com.

**Learnings**
__Vertieftes Verständnis für das Zusammenspiel von Frontend (HTML, CSS, JavaScript) und Backend‑APIs (PHP) beim Laden und Aufbereiten von Messdaten.__
__Umgang mit dynamischen UI‑Elementen wie Dialogen, Date‑ und Timepicker sowie dem Nachladen von Daten abhängig von User‑Eingaben.__
__Feinjustierung von Layouts mit Flexbox, Grid und transform‑Eigenschaften, um ein responsive Design zu erreichen.__
__Umgang mit Deployment‑Themen (Ordnerstruktur, relative Pfade, 404‑Fehler bei Assets, Unterschiede zwischen lokaler Umgebung und Live‑Server).__

**Schwierigkeiten / Herausforderungen**
__Die Integration der Daten ins Frontend war anfangs schwer umzusetzen mit unserem Wissensstand. Von meinem Chef (Rahel) habe ich die PHP‑Schnittstellen und den Ablauf vom Datenbank‑Request erklärt bekommen, was für die Fortsetzung unseres Projektes sehr half.__
__Die präzise Platzierung der Stamps und des Info‑Popups war anspruchsvoll, da sich Elemente durch Änderungen an Grösse und Layout leicht verschoben haben und das Design sehr spezifische Anforderungen hatte.__
__Das responsive Verhalten der Postkarte (Breite/Höhe, Skalierung der Rückseite, Position der Textbox) erforderte viele Iterationsschritte und Tests, bis alles auf verschiedenen Bildschirmgrössen stimmig aussah.__
__Beim Deployment traten 404‑Fehler auf, weil der assets‑Ordner zunächst nicht korrekt auf den Server hochgeladen war; dadurch wurden Bilder und SVGs nicht geladen und die Interaktion wirkte „kaputt“.__

**Sonstige Anmerkungen**
__Wir entschieden uns in der mobilen Ansicht doch nicht einfach eine scrollbare Version zu gestalten, sondern gestalteten die Tabs Front und Back – Ansicht Vorder‑ und Rückseite separat, da wir diese Version als handlicher und schöner empfanden fürs mobile Design.__
__Wir entschieden uns das Info-Overlay, welches sich beim Klicken auf den Info-Button oben rechts im Popup öffnet, mit einem X Button zu versehen zur Schliessung. Wir fanden es handlicher, nach dem man auf der linken Seite scrollte, als wieder auf den Info-Button zu klicken.__
__Bei den Pollen gibt es auf der Website nur einen Wert von 0 an, egal welches Datum und welche Uhrzeit man auswählt. Wir haben die API mehrmals getestet und dort wurde auch immer einen Wert von 0 ausgespielt. Die Datenbank nimmt die Daten also korrekt auf.__

**Genutzte Ressourcen**
__Dokumentation und Beispiele zu HTML, CSS (Flexbox, Grid, transform) und JavaScript für DOM‑Manipulation und Fetch‑Requests.__
__PHP‑Know‑how und Unterstützung meines Chefs zur Anbindung der API‑Endpunkte (getLatestByCity, getByDate etc.) und zum Verständnis der Backend‑Logik.__
__Hosting‑/FTP‑Dokumentation von Infomaniak für das Hochladen der Website und das korrekte Einrichten der Ordnerstruktur.__
__Perplexity wurde genutzt, um Verständnisfragen zu Frontend–Backend‑Zusammenspiel, API‑Aufrufen und Deployment (Assets, Ordnerstruktur) zu klären.__

