import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function PacketDecoderApp() {
  const [input, setInput] = useState('');
  // const [packets, setPackets] = useState([]);
  const [decoded, setDecoded] = useState([]);
  const [errors, setErrors] = useState([]);

  function parsePackets(text) {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((l) => l.replace(/^"|"$/g, ""));

    const parsed = [];
    const errs = [];

    let currentGroupKey = null;
    let groupIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const normalized = raw.replace(/\s+/g, " ").trim();

      const re = /^(\d+)\s*\/\s*(\d+)\s*-\s*(\d{2,3})\s*-\s*([NF])(?:\s*=\s*(.+))?$/i;
      const m = normalized.match(re);
      if (!m) {
        errs.push({ raw, msg: "Formato no reconocido" });
        continue;
      }

      const idx = parseInt(m[1], 10);
      const total = parseInt(m[2], 10);
      const dec = parseInt(m[3], 10);
      const type = m[4].toUpperCase();
      const provided = m[5] ? m[5].trim() : null;

      const key = `${total}-${type}`;
      if (currentGroupKey !== key) {
        groupIndex += 1;
        currentGroupKey = key;
      }

      const charFromDec = Number.isNaN(dec) ? null : String.fromCharCode(dec);
      const char = provided || charFromDec || "";

      parsed.push({ raw, idx, total, dec, type, char, provided, group: groupIndex });
    }

    const groups = {};
    parsed.forEach((p) => {
      groups[p.group] = groups[p.group] || { total: p.total, type: p.type, packets: [] };
      groups[p.group].packets.push(p);
    });

    const decodedMsgs = [];
    Object.keys(groups).forEach((gk) => {
      const g = groups[gk];
      g.packets.sort((a, b) => a.idx - b.idx);
      const assembled = [];
      for (let i = 1; i <= g.total; i++) {
        const found = g.packets.find((p) => p.idx === i);
        assembled.push(found ? found.char : "?");
      }
      decodedMsgs.push({ group: gk, total: g.total, type: g.type, text: assembled.join("") });
    });

    // setPackets(parsed);
    setDecoded(decodedMsgs);
    setErrors(errs);
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Decodificador de paquetes (protocolo IP)
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'flex-start' }}>
          {/* Columna izquierda: input y botones */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Pega cada paquete en una línea. Ejemplo: <code>1/5-084-N = T</code>
            </Typography>

            <TextField
              label="Paquetes (una línea por paquete)"
              multiline
              minRows={12}
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ my: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={() => parsePackets(input)}>
                  Decodificar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setInput("");
                    // setPackets([]);
                    setDecoded([]);
                    setErrors([]);
                  }}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Columna derecha: resultados */}
          <Box sx={{ flex: 1 }}>
            {/* <Typography variant="h6">Paquetes detectados</Typography>
            {packets.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No hay paquetes parseados todavía.</Typography>
            ) : (
              <List dense>
                {packets.map((p, i) => (
                  <React.Fragment key={i}>
                    <ListItem>
                      <ListItemText
                        primary={`${p.raw}`}
                        secondary={`grupo ${p.group} — idx ${p.idx}/${p.total} — dec ${p.dec} — type ${p.type} — char: '${p.char}'`}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            )} */}

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Mensajes ensamblados</Typography>
              {decoded.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No hay mensajes ensamblados.</Typography>
              ) : (
                decoded.map((d) => (
                  <Paper key={d.group} sx={{ p: 2, mb: 1 }} variant="outlined">
                    <Typography variant="subtitle2">Paquete {d.group} — Tipo: {d.type} — Total: {d.total}</Typography>
                    <Typography variant="body1" sx={{ fontFamily: "monospace", mt: 1 }}>{d.text}</Typography>
                  </Paper>
                ))
              )}
            </Box>

            {errors.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Errores</Typography>
                <List dense>
                  {errors.map((e, i) => (
                    <ListItem key={i}><ListItemText primary={e.raw} secondary={e.msg} /></ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
