package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Track;
import com.mycompany.myapp.repository.TrackRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Track}.
 */
@RestController
@RequestMapping("/api")
public class TrackResource {

    private final Logger log = LoggerFactory.getLogger(TrackResource.class);

    private static final String ENTITY_NAME = "track";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackRepository trackRepository;

    public TrackResource(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    /**
     * {@code POST  /tracks} : Create a new track.
     *
     * @param track the track to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new track, or with status {@code 400 (Bad Request)} if the track has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tracks")
    public ResponseEntity<Track> createTrack(@Valid @RequestBody Track track) throws URISyntaxException {
        log.debug("REST request to save Track : {}", track);
        if (track.getId() != null) {
            throw new BadRequestAlertException("A new track cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Track result = trackRepository.save(track);
        return ResponseEntity.created(new URI("/api/tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tracks} : Updates an existing track.
     *
     * @param track the track to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated track,
     * or with status {@code 400 (Bad Request)} if the track is not valid,
     * or with status {@code 500 (Internal Server Error)} if the track couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tracks")
    public ResponseEntity<Track> updateTrack(@Valid @RequestBody Track track) throws URISyntaxException {
        log.debug("REST request to update Track : {}", track);
        if (track.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Track result = trackRepository.save(track);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, track.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tracks} : get all the tracks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracks in body.
     */
    @GetMapping("/tracks")
    public List<Track> getAllTracks() {
        log.debug("REST request to get all Tracks");
        return trackRepository.findAll();
    }

    /**
     * {@code GET  /tracks/:id} : get the "id" track.
     *
     * @param id the id of the track to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the track, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tracks/{id}")
    public ResponseEntity<Track> getTrack(@PathVariable String id) {
        log.debug("REST request to get Track : {}", id);
        Optional<Track> track = trackRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(track);
    }

    /**
     * {@code DELETE  /tracks/:id} : delete the "id" track.
     *
     * @param id the id of the track to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tracks/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable String id) {
        log.debug("REST request to delete Track : {}", id);
        trackRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
