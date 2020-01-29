package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Artist;
import org.neo4j.springframework.data.repository.Neo4jRepository;
import java.util.List;
import org.springframework.stereotype.Repository;


/**
 * Spring Data Neo4j repository for the Artist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtistRepository extends Neo4jRepository<Artist, String> {

    List<Artist> findAll();

}
