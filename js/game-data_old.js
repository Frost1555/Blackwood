// Game Story Data
const GAME_DATA = [
  {
    "Id": "start",
    "Text": "Sie erwachen auf einer kalten Metallliege. Über Ihnen hängt eine Lampe, die nicht leuchtet, sondern in unregelmäßigen Abständen kurz aufblitzt, als würde jemand hinter Ihren Augen einen Schalter betätigen. Das letzte, woran Sie sich erinnern, ist nasser Asphalt, Scheinwerfer, ein Aufprall. Dann nichts. An der Wand hängt ein vergilbtes Schild: 'Blackwood Psychiatrische Anstalt - Station 7'. Neben der Tür liegt ein umgekippter Rollwagen. Aus dem Flur dringt ein langes, kehliges Summen.",
    "Options": [
      {
        "Id": "start_door",
        "Text": "Die Tür öffnen und auf den Flur gehen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Mut": 1
        }
      },
      {
        "Id": "start_search",
        "Text": "Den Behandlungsraum durchsuchen",
        "TargetSceneId": "exam_room_search",
        "StatChanges": {
          "Vorsicht": 1
        }
      },
      {
        "Id": "start_mirror",
        "Text": "Zum gesprungenen Spiegel an der Wand gehen",
        "TargetSceneId": "mirror_first",
        "StatChanges": {
          "Neugier": 1
        }
      }
    ]
  },
  {
    "Id": "exam_room_search",
    "Text": "Zwischen rostigen Instrumenten und zerbrochenen Ampullen finden Sie eine kleine Taschenlampe. Sie funktioniert nur, wenn Sie sie schütteln. In einer Schublade liegt außerdem eine Patientenakte mit Ihrem Namen. Die erste Seite ist leer, bis die Tinte langsam sichtbar wird: 'Subjekt reagiert wieder. Schleife instabil. Erinnerung darf nicht vollständig zurückkehren.' Unter der Akte klebt eine dünne Magnetkarte.",
    "Options": [
      {
        "Id": "take_flashlight_keycard",
        "Text": "Taschenlampe, Akte und Magnetkarte mitnehmen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Erinnerung": 1,
          "Unruhe": 1
        },
        "ItemChanges": {
          "Taschenlampe": 1,
          "Schlüsselkarte": 1,
          "Patientenakte": 1
        }
      },
      {
        "Id": "leave_file_take_light",
        "Text": "Nur die Taschenlampe nehmen und die Akte liegen lassen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Vorsicht": 1
        },
        "ItemChanges": {
          "Taschenlampe": 1
        }
      },
      {
        "Id": "read_file_deeper",
        "Text": "Die Akte trotz des Schabens vor der Tür weiter lesen",
        "TargetSceneId": "exam_file_deeper",
        "StatChanges": {
          "Erinnerung": 2,
          "Fokus": 1,
          "Unruhe": 2
        }
      }
    ]
  },
  {
    "Id": "corridor_station7",
    "Text": "Der Flur von Station 7 ist lang, schmal und von flackernden Neonröhren durchzogen. Türen mit kleinen Sichtfenstern säumen die Wände. Einige Sichtfenster sind von innen mit Fingernägeln zerkratzt. Am Ende führt eine Treppe nach oben zu den Verwaltungsräumen und eine nach unten zur Behandlungsstation. Links blinkt schwach das Schild 'Schwesternzimmer'. Rechts hängt ein Kinderbild: ein Haus ohne Tür.",
    "Options": [
      {
        "Id": "go_nurse_station",
        "Text": "Das Schwesternzimmer betreten",
        "TargetSceneId": "nurse_station",
        "StatChanges": {
          "Vorsicht": 1
        }
      },
      {
        "Id": "go_patient_cells",
        "Text": "Die Patientenzellen untersuchen",
        "TargetSceneId": "patient_cells",
        "StatChanges": {
          "Neugier": 1
        }
      },
      {
        "Id": "go_stairs_up",
        "Text": "Die Treppe nach oben nehmen",
        "TargetSceneId": "admin_stairwell",
        "StatChanges": {
          "Mut": 1
        }
      }
    ]
  },
  {
    "Id": "nurse_station",
    "Text": "Das Schwesternzimmer riecht nach kaltem Kaffee und Desinfektionsmittel. Ein Funkgerät knistert auf dem Tisch. Daneben liegt ein Dienstplan, auf dem Ihr Name in jeder Zeile steht. In einem Spind finden Sie Batterien und eine Notiz: 'Wenn Schwester Elsbeth singt, nicht antworten.'",
    "Options": [
      {
        "Id": "use_radio",
        "Text": "Das Funkgerät benutzen",
        "TargetSceneId": "radio_contact",
        "StatChanges": {
          "Neugier": 1
        }
      },
      {
        "Id": "leave_nurse_station",
        "Text": "Zurück auf den Flur",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {}
      }
    ]
  },
  {
    "Id": "radio_contact",
    "Text": "Sie drücken die Sprechtaste. Erst Rauschen. Dann eine junge Stimme: 'Hier Mara. Wenn du wirklich wach bist, komm nicht zum Haupteingang. Der Ausgang dort frisst Leute.' Sie klingt, als würde sie unter Wasser sprechen. 'Du brauchst drei Zahlen und den Fahrstuhlschlüssel. Und glaub nicht dem Mann im weißen Mantel.'",
    "Options": [
      {
        "Id": "ask_mara_who",
        "Text": "'Wer bist du?'",
        "TargetSceneId": "mara_intro",
        "StatChanges": {
          "Vertrauen": 1,
          "Erinnerung": 1
        }
      },
      {
        "Id": "ask_mara_why",
        "Text": "'Warum sollte ich dir trauen?'",
        "TargetSceneId": "radio_distrust",
        "StatChanges": {
          "Vorsicht": 1
        }
      }
    ]
  },
  {
    "Id": "mara_intro",
    "Text": "'Ich bin... ich war eine Krankenschwester hier. Bevor das mit der Schleife anfing. Ich erinnere mich noch, bevor alles vertauscht wurde. Es gibt noch zwei von uns hier, die noch einigermaßen bei Verstand sind. Der Fahrstuhl führt ins Untergeschoss. Dort ist die Zentrale. Der Code ist 4-7-2, aber du musst die Zahlen sammeln.'",
    "Options": [
      {
        "Id": "ask_numbers",
        "Text": "Die Zahlen erfragen",
        "TargetSceneId": "mara_numbers",
        "StatChanges": {
          "Vertrauen": 2,
          "Erinnerung": 1
        }
      },
      {
        "Id": "plan_discussion",
        "Text": "'Was ist der Plan?'",
        "TargetSceneId": "mara_plan",
        "StatChanges": {
          "Neugier": 1
        }
      }
    ]
  },
  {
    "Id": "radio_distrust",
    "Text": "'Das ist fair,' sagt die Stimme. Sie klingt belustig. 'Vertrau mir nicht. Finde es selber heraus. Aber wenn du zum Haupteingang gehst und die lächelnde Frau siehst, vergiss es. Sie wird dich willkommen heißen und dann werden deine Knochen zu Sand.' Dann wird die Frequenz zu weißem Rauschen.",
    "Options": [
      {
        "Id": "distrust_back_to_station",
        "Text": "Zurück auf den Flur",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Unruhe": 1
        }
      }
    ]
  },
  {
    "Id": "mara_numbers",
    "Text": "'Eine ist die 4, die du vielleicht schon gefunden hast. Die andere 7 ist eine Narbe. Und die 2 liegt in der Vergangenheit - auf den alten Fotos in der Verwaltung.'",
    "Options": [
      {
        "Id": "accept_mission",
        "Text": "Die Mission annehmen",
        "TargetSceneId": "nurse_station",
        "StatChanges": {
          "Vertrauen": 2,
          "Fokus": 1
        }
      }
    ]
  },
  {
    "Id": "mara_plan",
    "Text": "'Das Untergeschoss ist nicht wirklich ein Untergeschoss. Es ist eine Art Zentrale. Wenn wir sie lahmlegen, bricht die Schleife auf. Aber nur wenn die drei Zahlen korrekt sind. Wir brauchen dich dafür.'",
    "Options": [
      {
        "Id": "plan_accept",
        "Text": "Ich helfe euch",
        "TargetSceneId": "mara_numbers",
        "StatChanges": {
          "Vertrauen": 3,
          "Mut": 1
        }
      }
    ]
  },
  {
    "Id": "patient_cells",
    "Text": "Die Patientenzellen sind beängstigend leer. Sie finden ein altes Foto unter einer Matratze. Darauf sehen Sie sich selbst - zusammen mit einem Mann in einem weißen Mantel - beide lächeln in die Kamera.",
    "Options": [
      {
        "Id": "take_photo",
        "Text": "Das Foto einstecken",
        "TargetSceneId": "admin_stairwell",
        "StatChanges": {
          "Erinnerung": 2,
          "Unruhe": 2,
          "Mut": 1
        }
      },
      {
        "Id": "leave_photo",
        "Text": "Das Foto liegen lassen und den Ort verlassen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Vorsicht": 1
        }
      }
    ]
  },
  {
    "Id": "admin_stairwell",
    "Text": "Die Treppen zum Verwaltungsbereich sind lang und schmal. Mit jedem Schritt nach oben werden die Geräusche lauter. An der Wand hängen Fotos: Verschiedene Patienten über die Jahrzehnte. Aber bei jedem zweiten Foto verändern sich die Gesichter zu Ihrem Gesicht.",
    "Options": [
      {
        "Id": "stairwell_up",
        "Text": "Die Treppe weiter hochsteigen",
        "TargetSceneId": "admin_office",
        "StatChanges": {
          "Mut": 1,
          "Erinnerung": 1
        }
      },
      {
        "Id": "stairwell_back",
        "Text": "Zurück nach Station 7",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Vorsicht": 1
        }
      }
    ]
  },
  {
    "Id": "admin_office",
    "Text": "Das Büro ist überraschend modern und hell. Ein großer Schreibtisch mit Computern. An der Wand eine Reihe von Dateien, alle mit Ihrem Namen beschriftet - von 1952 bis zum heutigen Datum. Das ist unmöglich. Sie sind nicht älter als 35. Auf dem Schreibtisch liegt eine Nachricht: 'Willkommen zu Hause. Ich bin unten in der Zentrale. Ich warte auf dich. - V.'",
    "Options": [
      {
        "Id": "office_files",
        "Text": "Die Dateien durchsuchen",
        "TargetSceneId": "office_files_discovery",
        "StatChanges": {
          "Erinnerung": 2,
          "Wahnsinn": 1
        }
      },
      {
        "Id": "office_go_down",
        "Text": "Direkt zur Zentrale gehen",
        "TargetSceneId": "treatment_entrance",
        "StatChanges": {
          "Mut": 2
        }
      }
    ]
  },
  {
    "Id": "office_files_discovery",
    "Text": "Sie sehen Ihre eigene Handschrift - Notizen über Patienten. Aber auf einigen Seiten haben Sie Ihre Handschrift auch als Notizen über sich selbst geschrieben: 'Das Subjekt widersetzt sich. Das Subjekt - ich - werde immer weniger ich selbst. Ist das das Ziel?' Ein neues Foto fällt heraus: Sie neben Dr. Voss, beide im Operationssaal.",
    "Options": [
      {
        "Id": "files_center",
        "Text": "Alles mitnehmen und zur Zentrale gehen",
        "TargetSceneId": "treatment_entrance",
        "StatChanges": {
          "Erinnerung": 2,
          "Mut": 1
        }
      },
      {
        "Id": "files_back",
        "Text": "Das ist zu viel. Zurück nach Station 7",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Wahnsinn": 2,
          "Unruhe": 2
        }
      }
    ]
  },
  {
    "Id": "treatment_entrance",
    "Text": "Der Fahrstuhl ist alt und verrostet. Die Türen öffnen sich mit einem Ächzen. Dort ist ein Schaltfeld mit Nummernblöcken. Ein Schild daneben sagt: 'ZENTRALE - NUR AUTORISIERTES PERSONAL'. Sie brauchen die richtige Kombination, um hinabzufahren.",
    "Options": [
      {
        "Id": "center_entry",
        "Text": "Den Fahrstuhl benutzen",
        "TargetSceneId": "elevator_code",
        "StatChanges": {}
      },
      {
        "Id": "center_back",
        "Text": "Zurückgehen",
        "TargetSceneId": "admin_stairwell",
        "StatChanges": {
          "Vorsicht": 1
        }
      }
    ]
  },
  {
    "Id": "elevator_code",
    "Text": "Sie stehen vor dem Zahlenfeld. Sie brauchen einen Code mit drei Ziffern. In Ihrer Erinnerung suchen Sie nach den Zahlen: Es gibt die 4, die vielleicht auf dem Zahn war. Die 7, die als Narbe auf Ihrer Handfläche ist. Und die 2, die Sie auf dem Foto gesehen haben. Die richtige Reihenfolge ist entscheidend. Welchen Code geben Sie ein?",
    "Options": [
      {
        "Id": "code_472",
        "Text": "4-7-2",
        "TargetSceneId": "center_success",
        "StatChanges": {
          "Fokus": 2,
          "Erinnerung": 2
        }
      },
      {
        "Id": "code_274",
        "Text": "2-7-4",
        "TargetSceneId": "center_wrong",
        "StatChanges": {
          "Wahnsinn": 2
        }
      },
      {
        "Id": "code_wrong",
        "Text": "Einen anderen Code ausprobieren",
        "TargetSceneId": "center_wrong",
        "StatChanges": {
          "Wahnsinn": 2,
          "Unruhe": 2
        }
      }
    ]
  },
  {
    "Id": "center_success",
    "Text": "Der Code ist richtig. Der Fahrstuhl brummt und fährt hinab. Sie passieren Station 6, dann 5, 4, 3, 2, 1 - dann unter Null. Die Fahrt scheint endlos. Schließlich hält der Fahrstuhl mit einem Schlag an. Die Türen öffnen sich zu einem Raum, der unmöglich sein sollte. Lichter blinken in geometrischen Mustern. Eine Stimme ertönt: 'Willkommen zur Zentrale. Willkommen nach Hause.'",
    "Options": [
      {
        "Id": "center_voss_confrontation",
        "Text": "Dr. Voss suchen",
        "TargetSceneId": "voss_control",
        "StatChanges": {
          "Mut": 2,
          "Erinnerung": 1
        }
      }
    ]
  },
  {
    "Id": "center_wrong",
    "Text": "Der Code ist falsch. Der Fahrstuhl fährt nicht an. Stattdessen sperren sich die Türen. Eine Stimme ertönt - die Stimme von Dr. Voss: 'Falsch. Die Schleife beginnt von vorne. Die Station 7, Versuch 848. Das Experiment fortgesetzt. Willkommen zu Hause.'",
    "Options": [
      {
        "Id": "wrong_fade",
        "Text": "Alles wird schwarz...",
        "TargetSceneId": "loop_ending",
        "StatChanges": {
          "Wahnsinn": 5,
          "Unruhe": 3
        }
      }
    ]
  },
  {
    "Id": "voss_control",
    "Text": "Dr. Voss sitzt in einer Art Kontrollzentrum. Um ihn herum sind Monitore. Er dreht sich langsam um. Sein Gesicht ist Ihr Gesicht. 'Ich bin der Kern deines Unbewusstseins. Du versuchst, mich zu bekämpfen, aber ich bin dein tiefster Gedanke.'",
    "Options": [
      {
        "Id": "voss_accept",
        "Text": "Akzeptieren und zusammenführen",
        "TargetSceneId": "acceptance_ending",
        "StatChanges": {
          "Erinnerung": 5,
          "Fokus": 3
        }
      },
      {
        "Id": "voss_reject",
        "Text": "Ablehnen und sich wehren",
        "TargetSceneId": "reality_break",
        "StatChanges": {
          "Mut": 4
        }
      }
    ]
  },
  {
    "Id": "acceptance_ending",
    "Text": "Sie akzeptieren Ihre andere Seite und sie verschmilzt mit Ihnen. Sie verstehen, dass Sie nicht nur ein Mensch sind - Sie sind ein Bewusstsein, das über mehrere Körper und Zeiten verteilt ist. Aber dann verstehen Sie: Sie wollen hier bleiben. Für immer im Kreis. Im Schleifenzustand. Wo es keine Angst gibt. Nur Wiederholung.",
    "Options": []
  },
  {
    "Id": "reality_break",
    "Text": "Ihre Ablehnung wird zur Energie. Die Zentrale beginnt zu bersten. Sie spüren, wie Ihr Bewusstsein zerrissen wird und zur Realität zurückkehrt. Sie erwachen auf einer echten Metallliege. Der Raum ist nicht Blackwood. Es ist ein Labor mit futuristischer Technologie. Menschen in futuristischen Anzügen schauen auf Sie herab. Einer sagt: 'Jahr 2087. Sie waren 135 Jahre in der Simulation. Das Experiment ist vorbei.'",
    "Options": []
  },
  {
    "Id": "loop_ending",
    "Text": "Alles wird schwarz. Sie spüren, wie Sie hinabsinken. Und dann erwachen Sie auf einer kalten Metallliege. Ihr Herz schlägt unregelmäßig. Über Ihnen blinkt eine Lampe. Das letzte, das Sie sich erinnern, ist Asphalt, Scheinwerfer. An der Wand hängt: 'Blackwood Psychiatrische Anstalt - Station 7'. Alles beginnt von vorne. Versuch 849.",
    "Options": []
  },
  {
    "Id": "exam_file_deeper",
    "Text": "Sie lesen weiter. Die Schrift wird unleserlicher, verworrener. Sie finden notiert: 'Das Medikament nimmt nicht. Der Patient erinnert sich. Wir müssen versiegeln.' Auf der nächsten Seite: 'Notfall-Schlüsselkarte versteckt im Patientenbüro, Schrank C. Für den Fall, dass Voss uns verlässt.' Sie entdecken auch eine kleine Magnetkarte unter der Akte.",
    "Options": [
      {
        "Id": "file_take_card",
        "Text": "Die Karte und die Akte nehmen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Erinnerung": 2,
          "Unruhe": 2
        },
        "ItemChanges": {
          "Schlüsselkarte": 1,
          "Patientenakte": 1
        }
      },
      {
        "Id": "file_just_karte",
        "Text": "Nur die Karte nehmen und gehen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Erinnerung": 1,
          "Unruhe": 1
        },
        "ItemChanges": {
          "Schlüsselkarte": 1
        }
      }
    ]
  },
  {
    "Id": "patient_cells",
    "Text": "Die Patientenzellen sind beängstigend leer. Sie finden ein altes Foto unter einer Matratze. Darauf sehen Sie sich selbst - zusammen mit einem Mann in einem weißen Mantel - beide lächeln in die Kamera. Ein Nummernschloss hängt an der Zellentür - es sieht beschädigt aus und könnte mit Ihrem Foto durchstoßen werden.",
    "Options": [
      {
        "Id": "take_photo",
        "Text": "Das Foto einstecken",
        "TargetSceneId": "admin_stairwell",
        "StatChanges": {
          "Erinnerung": 2,
          "Unruhe": 2,
          "Mut": 1
        },
        "ItemChanges": {
          "Altes_Foto": 1
        }
      },
      {
        "Id": "leave_photo",
        "Text": "Das Foto liegen lassen und den Ort verlassen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Vorsicht": 1
        }
      }
    ]
  },
  {
    "Id": "locked_storage",
    "Text": "Sie finden einen verschlossenen Medikamentenschrank im Krankenzimmer. Ein Schild besagt: 'Nur mit Genehmigung des Arztes'. Auf der Innenseite der Tür ist ein Zahlenkombinations-Schloss. Sie könnten versuchen, ihn mit der Schlüsselkarte zu öffnen, oder Sie könnten nach dem Code suchen.",
    "Options": [
      {
        "Id": "storage_use_keycard",
        "Text": "Die Schlüsselkarte verwenden",
        "TargetSceneId": "storage_opened",
        "StatChanges": {
          "Fokus": 1
        },
        "RequiredItems": ["Schlüsselkarte"],
        "ItemChanges": {
          "Schlüsselkarte": -1
        }
      },
      {
        "Id": "storage_forced",
        "Text": "Mit Gewalt aufbrechen",
        "TargetSceneId": "storage_forced_open",
        "StatChanges": {
          "Mut": 1,
          "Unruhe": 1
        }
      },
      {
        "Id": "storage_leave",
        "Text": "Weitergehen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {}
      }
    ]
  },
  {
    "Id": "storage_opened",
    "Text": "Die Schlüsselkarte öffnet den Schrank mit einem leisen Klick. Drinnen finden Sie Fläschchen mit verschiedenen Medikamenten. Eines trägt die Aufschrift: 'Gedächtnis-Antagonist - Dr. Voss PERSÖNLICH'. Es ist wertvoll. Es ist auch abscheulich.",
    "Options": [
      {
        "Id": "storage_take_meds",
        "Text": "Die Medikamente nehmen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Erinnerung": 1,
          "Unruhe": 1
        },
        "ItemChanges": {
          "Voss_Medikament": 1
        }
      },
      {
        "Id": "storage_leave_meds",
        "Text": "Alles zurücklassen",
        "TargetSceneId": "corridor_station7",
        "StatChanges": {
          "Vorsicht": 1
        }
      }
    ]
  },
  {
    "Id": "storage_forced_open",
    "Text": "Der Schrank gibt nach und öffnet sich mit einem lauten Krachen. Alarmglocken ertönen. Sie müssen schnell handeln. Im Schrank sehen Sie Medikamente, aber auch ein dunkles Objekt - das sieht aus wie eine Art Kontrolldiskette.",
    "Options": [
      {
        "Id": "forced_grab_disk",
        "Text": "Die Diskette schnappen und rennen",
        "TargetSceneId": "alarm_escape",
        "StatChanges": {
          "Mut": 2,
          "Unruhe": 2
        },
        "ItemChanges": {
          "Kontrolldiskette": 1
        }
      },
      {
        "Id": "forced_grab_meds",
        "Text": "Die Medikamente schnappen und rennen",
        "TargetSceneId": "alarm_escape",
        "StatChanges": {
          "Neugier": 1,
          "Unruhe": 3
        },
        "ItemChanges": {
          "Voss_Medikament": 1
        }
      }
    ]
  },
  {
    "Id": "alarm_escape",
    "Text": "Der Flur erfüllt sich mit rotem Licht. Sie hören Schritte - viele Schritte. Sie müssen einen Ausweg finden. Die Taschenlampe würde jetzt helfen - Sie könnten die Belüftungsschächte sehen und einen geheimen Durchgang finden.",
    "Options": [
      {
        "Id": "escape_vent",
        "Text": "Die Belüftung durchsuchen",
        "TargetSceneId": "vent_escape_success",
        "StatChanges": {
          "Fokus": 1,
          "Mut": 1
        },
        "RequiredItems": ["Taschenlampe"]
      },
      {
        "Id": "escape_stairs",
        "Text": "Zu den Treppen rennen",
        "TargetSceneId": "caught_by_guards",
        "StatChanges": {
          "Unruhe": 2
        }
      }
    ]
  },
  {
    "Id": "vent_escape_success",
    "Text": "Mit der Taschenlampe finden Sie den Belüftungsschacht. Sie kriechen hinein, gerade noch rechtzeitig, bevor die Wachen vorbei rennen. Sie sind in den Wänden. Zwischen den Rohren finden Sie etwas Überraschendes: eine handgeschriebene Nachricht: 'Wenn Sie das lesen, sind Sie einer von uns. Mara wartet im Untergeschoss.'",
    "Options": [
      {
        "Id": "vent_go_down",
        "Text": "Dem Schacht zum Untergeschoss folgen",
        "TargetSceneId": "center_success",
        "StatChanges": {
          "Vertrauen": 1,
          "Erinnerung": 1
        }
      }
    ]
  },
  {
    "Id": "caught_by_guards",
    "Text": "Sie rennen die Treppen hinauf, aber dort stehen bereits Wachen. Ihre Uniformen sind weiß. Sie sagen nichts. Sie fangen an zu laufen - nicht nach Ihnen, sondern neben Ihnen. Sie zwingen Sie zurück - nicht zu Station 7, sondern zu einem anderen Flur. Sie erkennen ihn: Ihr Zimmer. Sie werden sanft, aber bestimmt auf die Metallliege gelegt.",
    "Options": [
      {
        "Id": "guard_trapped",
        "Text": "Alles wird dunkel...",
        "TargetSceneId": "loop_ending",
        "StatChanges": {
          "Wahnsinn": 3,
          "Unruhe": 4
        }
      }
    ]
  },
  {
    "Id": "dark_corridor",
    "Text": "Ein Seitengang ist völlig dunkel. Ihre Taschenlampe würde hier unglaublich hilfreich sein. Mit dem Licht könnten Sie auf dem Boden eine Tür sehen - verborgen hinter Trümmern. Ohne Licht müssen Sie sich an der Wand entlangtasten.",
    "Options": [
      {
        "Id": "dark_with_light",
        "Text": "Die Taschenlampe benutzen, um die versteckte Tür zu sehen",
        "TargetSceneId": "secret_exit",
        "StatChanges": {
          "Mut": 1,
          "Fokus": 1
        },
        "RequiredItems": ["Taschenlampe"]
      },
      {
        "Id": "dark_blind",
        "Text": "Im Dunkeln weitergehen",
        "TargetSceneId": "dark_pit",
        "StatChanges": {
          "Unruhe": 2
        }
      }
    ]
  },
  {
    "Id": "secret_exit",
    "Text": "Die versteckte Tür öffnet sich zu einem unterirdischen Tunnel. Wasser tropft von oben. Aber Sie sehen auch - am Ende des Tunnels - Licht. Echtes Tageslicht. Sie könnten es schaffen.",
    "Options": [
      {
        "Id": "exit_run",
        "Text": "Zum Licht rennen",
        "TargetSceneId": "escape_ending",
        "StatChanges": {
          "Mut": 3
        }
      }
    ]
  },
  {
    "Id": "dark_pit",
    "Text": "Sie stolpern im Dunkeln. Ihr Fuß tritt in nichts mehr. Sie fallen. Und fallen. Und fallen. Bis Sie aufwachen - auf einer kalten Metallliege. Über Ihnen blinkt eine Lampe.",
    "Options": [
      {
        "Id": "fall_loop",
        "Text": "Die Schleife beginnt von vorne",
        "TargetSceneId": "loop_ending",
        "StatChanges": {
          "Wahnsinn": 4,
          "Unruhe": 4
        }
      }
    ]
  },
  {
    "Id": "escape_ending",
    "Text": "Sie kriechen aus dem Tunnel heraus. Erde, echte Erde, unter Ihren Fingernägeln. Der Himmel ist bewölkt, aber es ist der echte Himmel. Dahinter der Zaun der Anstalt. Sie können ihn überwinden. Sie sind draußen. Sie sind frei. Die Maschine hat Sie losgelassen.",
    "Options": []
  }
];
