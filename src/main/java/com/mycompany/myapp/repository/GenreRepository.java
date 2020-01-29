package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Genre;
import org.neo4j.springframework.data.repository.Neo4jRepository;
import java.util.List;
import org.springframework.stereotype.Repository;


/**
 * Spring Data Neo4j repository for the Genre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GenreRepository extends Neo4jRepository<Genre, String> {

    List<Genre> findAll();

}
