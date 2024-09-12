import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); /* ajout de l'etat null*/
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = ((type ? data?.events.filter((event) => event.type === type) : data?.events) || []).filter((event, index) => {
    if ((currentPage - 1) * PER_PAGE <= index && PER_PAGE * currentPage > index) {
      return true; /* erreur l'ancien code Aucun filtrage par type n'est appliqué. Il récupère simplement tous les événements et les pagine. et le code modifié : Filtre les événements par type si type est défini, sinon, il récupère tous les événements. Ensuite, il effectue la pagination sur les événements filtrés.*/
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
