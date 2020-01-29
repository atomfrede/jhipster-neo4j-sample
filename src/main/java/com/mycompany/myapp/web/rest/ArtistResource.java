package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Artist;
import com.mycompany.myapp.repository.ArtistRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Artist}.
 */
@RestController
@RequestMapping("/api")
public class ArtistResource {

    private final Logger log = LoggerFactory.getLogger(ArtistResource.class);

    private static final String ENTITY_NAME = "artist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArtistRepository artistRepository;

    public ArtistResource(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    /**
     * {@code POST  /artists} : Create a new artist.
     *
     * @param artist the artist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new artist, or with status {@code 400 (Bad Request)} if the artist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/artists")
    public ResponseEntity<Artist> createArtist(@Valid @RequestBody Artist artist) throws URISyntaxException {
        log.debug("REST request to save Artist : {}", artist);
        if (artist.getId() != null) {
            throw new BadRequestAlertException("A new artist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Artist result = artistRepository.save(artist);
        return ResponseEntity.created(new URI("/api/artists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /artists} : Updates an existing artist.
     *
     * @param artist the artist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated artist,
     * or with status {@code 400 (Bad Request)} if the artist is not valid,
     * or with status {@code 500 (Internal Server Error)} if the artist couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/artists")
    public ResponseEntity<Artist> updateArtist(@Valid @RequestBody Artist artist) throws URISyntaxException {
        log.debug("REST request to update Artist : {}", artist);
        if (artist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Artist result = artistRepository.save(artist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, artist.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /artists} : get all the artists.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of artists in body.
     */
    @GetMapping("/artists")
    public List<Artist> getAllArtists(@RequestParam(required = false) String filter) {
        if ("album-is-null".equals(filter)) {
            log.debug("REST request to get all Artists where album is null");
            return StreamSupport
                .stream(artistRepository.findAll().spliterator(), false)
                .filter(artist -> artist.getAlbum() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Artists");
        return artistRepository.findAll();
    }

    /**
     * {@code GET  /artists/:id} : get the "id" artist.
     *
     * @param id the id of the artist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the artist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/artists/{id}")
    public ResponseEntity<Artist> getArtist(@PathVariable String id) {
        log.debug("REST request to get Artist : {}", id);
        Optional<Artist> artist = artistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(artist);
    }

    /**
     * {@code DELETE  /artists/:id} : delete the "id" artist.
     *
     * @param id the id of the artist to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/artists/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable String id) {
        log.debug("REST request to delete Artist : {}", id);
        artistRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
