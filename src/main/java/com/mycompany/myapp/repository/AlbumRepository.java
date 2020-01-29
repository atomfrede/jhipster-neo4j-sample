package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Album;
import org.neo4j.springframework.data.repository.Neo4jRepository;
import java.util.List;
import org.springframework.stereotype.Repository;


/**
 * Spring Data Neo4j repository for the Album entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlbumRepository extends Neo4jRepository<Album, String> {

    List<Album> findAll();

}
