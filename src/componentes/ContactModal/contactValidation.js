

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(name, value) {
  const v = (value || "").trim();

  switch (name) {
    case "nombre":
      if (!v) return "El nombre es obligatorio.";
      if (v.length < 2) return "El nombre es demasiado corto.";
      if (v.length > 60) return "El nombre es demasiado largo.";
      return "";

    case "email":
      if (!v) return "El email es obligatorio.";
      if (!emailRegex.test(v)) return "Introduce un email válido.";
      if (v.length > 120) return "El email es demasiado largo.";
      return "";

    case "asunto":
      if (v.length > 120) return "El asunto es demasiado largo.";
      return "";

    case "mensaje":
      if (!v) return "El mensaje es obligatorio.";
      if (v.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      if (v.length > 1200) return "El mensaje es demasiado largo.";
      return "";

    default:
      return "";
  }
}

export function validateForm(form) {
  const errors = {
    nombre: validateField("nombre", form.nombre),
    email: validateField("email", form.email),
    asunto: validateField("asunto", form.asunto),
    mensaje: validateField("mensaje", form.mensaje),
  };

  const isValid = Object.values(errors).every((e) => !e);

  return { isValid, errors };
}

export function isFormStructurallyValid(form) {
  return (
    !validateField("nombre", form.nombre) &&
    !validateField("email", form.email) &&
    !validateField("mensaje", form.mensaje)
  );
}
